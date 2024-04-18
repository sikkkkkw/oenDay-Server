import User from "../models/user";
import bcrypt from "bcrypt";
const { SolapiMessageService } = require('solapi'); // Solapi SDK를 사용

// 보안을 위해 pfid 와 templateId 을 숨김 
const api_key = process.env.API_KEY; 
const api_secret = process.env.API_SECRET;
const messageService = new SolapiMessageService(api_key, api_secret);

// 테스트
// 회원가입
export const memberRegister = async (req, res) => {
  try {
    const {
      body: { username, email,phone, password },
    } = req;

    // 아이디 중복처리
    const exist = await User.exists({ $or: [{ username }, { email }] });

    console.log(exist);
    if (exist) {
      return res.send({
        result: false,
        message: "아이디나 이메일이 중복입니다..",
      });
    }

    // 패스워드 암호화
    const hashedPassword = bcrypt.hashSync(password, 5);
    console.log("password: ", hashedPassword);

    const data = User.create({
      username: username,
      email: email,
      phone:phone,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.send({ result: true, data });
  } catch (error) {
    console.log(error);
  }
};

// 로그인
export const memberLogin = async (req, res) => {
  // 데이터 가져오기
  const {
    body: { username, password },
  } = req;

  // 아이디 중복체크
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.send({ result: false, message: "해당하는 유저가 없습니다" });
  }
  // bcrypt를 사용자가 입력한 패스워드와 DB에 있는 패스워드 확인
  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) {
    return res.send({ result: false, message: "패스워드가 다릅니다." });
  }
  // 패스워드가 맞으면 로그인
  if (ok) {
    // 로그인
    res.send({result: true,token:user?._id})
  }
};

// 로그인 성공
export const loginSuccess = async (req, res) => {
  console.log("loginSuceess",req.query.token);
  try {
    const user= await User.findById(req.query.token)
    console.log(user);
    if (user) {
      res.send({ result: true, user: user, isLogin: true });
    } else {
      res.send({ result: true, isLogin: false });
    }
  } catch (error) {
    console.log(error);
  }
};

// 로그아웃
export const logout = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.send({ result: true, message: "로그아웃 성공" });
      
    });
  } catch (error) {
    console.log(error);
  }
};

// 소셜카카오 로그인
export const kakaoLogin = async (req, res) => {
  // step 1. 인가코드 받기
  const {
    query: { code },
  } = req;

  // step 2. 토큰 받기
  const KAKAO_BASE_PATH = "https://kauth.kakao.com/oauth/token";
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${KAKAO_BASE_PATH}?${params}`;
  const data = await fetch(finalUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const tokenRequest = await data.json();

  // step 3. 사용자 정보 받기
  const { access_token } = tokenRequest;
  if (access_token) {
    const userRequest = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const userData = await userRequest.json();
    const {
      properties: { nickname, profile_image },
      kakao_account: { email },
    } = userData;

    // 사용자 정보 중에 이메일 값이 DB에 있으면
    // 로그인
    const user = await User.findOne({ email });
    if (user) {
      // 로그인
      req.session.save(() => {
        req.session.user = {
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
        };
        const data = req.session;
        console.log(data);
        res.send({ result: true, data: data });
      });
    } else {
      // 회원가입
      const userData = await User.create({
        username: nickname,
        email,
        phone,
        profileImage: profile_image,
        createdAt: Date.now(),
      });
      res.send({ result: true, data: userData, message: "회원가입 완료!" });
    }

    // 이메일 값이 DB에 없으면
    // 회원가입
  }
};

// 솔라피 
export const solap = async (req, res) => {
  console.log(req.body)
  const { name, className , year , month , day , people, tel , LINK, disableSms } = req.body;
  try {
  const pfid = process.env.PFID
  const templateId = process.env.TEMP

  const response = await messageService.send({
      to: tel,
      from: "01027997339", // 발신번호를 정확하게 입력해주세요.
      kakaoOptions: {
          pfId: pfid,
          templateId: templateId,
          variables: name && LINK ? {
              "#{name}": name,
              "#{class}": className,
              "#{year}": year,
              "#{month}": month,
              "#{day}": day,
              "#{people}": people,
              "#{LINK}": LINK
          } : {},
          disableSms: disableSms || false, // 필요에 따라 disableSms 옵션 사용 
      }
  });

    res.json({ success: true, message: '알림톡 전송 성공', data: response }); // 요청이 완료되었을때 클라에게 뿌려지는 데이터(JSON)
  } catch (error) {
      console.error("Failed to send message:", error);
      res.status(error.response.status).json({ success: false, message: '메시지 전송 실패', error: error.message });
  }
};
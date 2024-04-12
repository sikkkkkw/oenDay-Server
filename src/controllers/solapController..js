const express = require('express'); // express 사용 선언
const cors = require('cors'); // 크로스 도메인 HTTPS 요청 허용 (cors() 을 입력하면 모든 도메인의 요청을 허용한다라는 뜻)
const { SolapiMessageService } = require('solapi'); // Solapi SDK를 사용

// 솔라피 API KEY 사용 선언
const api_key = 'NCSJTUHVWWQ0EWKT'; 
const api_secret = 'AU16IKRS7CVUPXXWOWP3ECGMEFBB7VCQ';
const messageService = new SolapiMessageService(api_key, api_secret); //솔라피 SDK 인스턴스 사용 선언 

// Express  설정
const app = express();
app.use(cors()); // CORS 허용 (향후 배포를하게되면 해당하는 URL을 cors("https://~~" 으로 지정해줄것 ! ))
app.use(express.json()); // JSON 본문 파싱

// 알림톡 메시지 발송 함수
app.post('/send-message', async (req, res) => {
    console.log(req.body);
    const { name, className , year , month , day , people, LINK, pfid, templateId, disableSms } = req.body;
    try {
        // Solapi SDK를 사용하여 메시지 전송

        // 보안을 위해 pfid 와 templateId 을 숨김 
        const pfid = "KA01PF22041206411o33TFWW9Sl71Ppp"
        const templateId = "KA01TP220425021337488b6WEd5EwL3C"

        const response = await messageService.send({
            to: tel,
            from: "01033528779", // 발신번호를 정확하게 입력해주세요.
            kakaoOptions: {
                pfId: pfid,
                templateId: templateId,
                variables: name && btn_url ? {
                    "#{name}": name,
                    "#{class}": className,
                    "#{year}": year,
                    "#{month}": month,
                    "#{day}": day,
                    "#{people}": people,
                    "#{LINK}": LINK
                } : {},
                disableSms: disableSms || false, // 필요에 따라 disableSms 옵션 사용 (건들 ㄴㄴ)
            }
        });
    
        res.json({ success: true, message: '알림톡 전송 성공', data: response }); // 요청이 완료되었을때 클라에게 뿌려지는 데이터(JSON)
    } catch (error) {
        console.error("Failed to send message:", error);
        res.status(error.response.status).json({ success: false, message: '메시지 전송 실패', error: error.message });
    }
});

// 서버 시작
const port = 4001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




package HarmonyRentals.Service;


import HarmonyRentals.Exceptions.MailSenderException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
@Service
@Log4j2
@EnableAsync
public class MailService {

    private final JavaMailSender emailSender;
    private final String fromAddress;

    @Autowired
    public MailService(JavaMailSender emailSender, @Value("${spring.mail.username}") String fromAddress) {
        this.emailSender = emailSender;
        this.fromAddress = fromAddress;
    }

    @Async
    public void sendMail(String to, String subject, String body) {
        log.info("Begin sendMail");

        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setText(body, true);
            helper.setSubject(subject);
            helper.setFrom(fromAddress);
            emailSender.send(message);
            log.info("Email sent successfully.");
        } catch (Exception e) {
            log.error("Failed to send email: " + e.getMessage(), e);
            throw new MailSenderException(e);
        }
    }

}

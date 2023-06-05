package HarmonyRentals.Repository;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;


public interface AwsS3Repository {
    void uploadFile(MultipartFile file);

    List<String> getObjectsFromS3();

    InputStream downloadFile(String key);
}

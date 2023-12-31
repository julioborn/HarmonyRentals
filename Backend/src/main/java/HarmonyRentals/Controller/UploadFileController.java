package HarmonyRentals.Controller;

import HarmonyRentals.Repository.AwsS3Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static HarmonyRentals.HarmonyRentalsApp.endpoint;

@RestController
@RequestMapping("/s3")
public class UploadFileController {
    @Autowired
    private AwsS3Repository awsS3Repository;
    @CrossOrigin(origins = endpoint)
    @PostMapping(value = "/upload", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> uploadFile(@RequestPart(value = "file") MultipartFile file) {
        String imageUrl = awsS3Repository.uploadFile(file);
        return ResponseEntity.ok().body("{\"url\":\"" + imageUrl + "\"}");
    }
    @CrossOrigin(origins =  endpoint)
    @GetMapping(value = "/list")
    public ResponseEntity<List<String>> listFiles() {
        return new ResponseEntity<List<String>>(awsS3Repository.getObjectsFromS3(), HttpStatus.OK);
    }
    @CrossOrigin(origins =  endpoint)
    @GetMapping(value = "/download")
    public ResponseEntity<Resource> download(@RequestParam("key") String key) {
        InputStreamResource resource  = new InputStreamResource(awsS3Repository.downloadFile(key));
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+key+"\"").body(resource);
    }
}

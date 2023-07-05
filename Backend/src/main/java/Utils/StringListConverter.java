package Utils;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collections;
import java.util.List;

@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            // Handle exception
        }
        return null;
    }

    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        if (dbData != null) {
            try {
                return objectMapper.readValue(dbData, new TypeReference<List<String>>() {});
            } catch (JsonProcessingException e) {
                // Handle exception
            }
        }
        return Collections.emptyList();
    }
}

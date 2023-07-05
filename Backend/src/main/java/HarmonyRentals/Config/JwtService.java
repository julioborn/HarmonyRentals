package HarmonyRentals.Config;

import HarmonyRentals.Models.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private static final Logger logger = LogManager.getLogger(JwtService.class);
    private static final String secret_Key = "3F4528482B4D6251655468576D5A7134743777217A25432A46294A404E635266";

    public String obtenerNombre(String token) {
        logger.info("Extracting name from token: {}", token);

        String usuario = extractClaim(token, claims -> claims.get("usuario", String.class));

        logger.info("Usuario extracted: {}", usuario);

        return usuario;
    }


    public <T> T extractClaim (String token, Function <Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken (UserDetails userDetails){
        return generateTokenWithClaims(new HashMap<>(), userDetails);
    }


    public String generateTokenWithClaims(Map<String, Object> extraClaims, UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>(extraClaims);
        claims.put("usuario", userDetails.getUsername());

        if (userDetails instanceof Usuario) {
            Usuario usuario = (Usuario) userDetails;
            claims.put("nombre", usuario.getNombre());
            claims.put("apellido", usuario.getApellido());
            claims.put("rol", usuario.getRol().getNombre());
            claims.put("id", usuario.getId());
        }

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 48))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    public Boolean isTokenValid(String token, UserDetails userDetails){
        final String usuarioNombre = obtenerNombre(token);
        return (usuarioNombre.equals(userDetails.getUsername())) && isTokenExpired(token);
    }
private Boolean isTokenExpired(String token){
        return obtenerExpiracion(token).before(new Date());
}
private Date obtenerExpiracion(String token) {
        return extractClaim(token, Claims::getExpiration);
}
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
     private Key getSignInKey(){
        byte [] keyBytes= Decoders.BASE64.decode(secret_Key);
        return Keys.hmacShaKeyFor(keyBytes);
     }


}
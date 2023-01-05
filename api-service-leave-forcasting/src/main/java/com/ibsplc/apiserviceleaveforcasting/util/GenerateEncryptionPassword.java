package com.ibsplc.apiserviceleaveforcasting.util;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public class GenerateEncryptionPassword {

    public static final String AES = "AES";

    private static String byteArrayToHexString(byte[] b) {
        StringBuffer sb = new StringBuffer(b.length * 2);
        for (int i = 0; i < b.length; i++) {
            int v = b[i] & 0xff;
            if (v < 16) {
                sb.append('0');
            }
            sb.append(Integer.toHexString(v));
        }
        return sb.toString().toUpperCase();
    }

    private static byte[] hexStringToByteArray(String s) {
        byte[] b = new byte[s.length() / 2];
        for (int i = 0; i < b.length; i++) {
            int index = i * 2;
            int v = Integer.parseInt(s.substring(index, index + 2), 16);
            b[i] = (byte) v;
        }
        return b;
    }

    public String generateEncryptedPassword(String plainPassword)

    {
        try {


        String key = "DB99A2A8EB6904F492E9DF0595ED683C";
//        String password = "Admin";
        GenerateEncryptionPassword s = new GenerateEncryptionPassword();
        byte[] bytekey = s.hexStringToByteArray(key);
        SecretKeySpec sks = new SecretKeySpec(bytekey, GenerateEncryptionPassword.AES);
        Cipher cipher = Cipher.getInstance(GenerateEncryptionPassword.AES);
        cipher.init(Cipher.ENCRYPT_MODE, sks, cipher.getParameters());
        byte[] encrypted = cipher.doFinal(plainPassword.getBytes());
        String encryptedpwd = s.byteArrayToHexString(encrypted);
        System.out.println("****************  Encrypted Password  ****************");
        System.out.println(encryptedpwd);
        System.out.println("****************  Encrypted Password  ****************");
        return  encryptedpwd;
        }
        catch (NoSuchAlgorithmException e){
            System.err.println("Exception in generateEncryptedPassword NoSuchAlgorithmException :: "+e.getMessage());
        }
        catch (NoSuchPaddingException e){
            System.err.println("Exception in generateEncryptedPassword NoSuchPaddingException :: "+e.getMessage());
        }
        catch (InvalidKeyException e){
            System.err.println("Exception in generateEncryptedPassword InvalidKeyException :: "+e.getMessage());
        }
        catch (InvalidAlgorithmParameterException e){
            System.err.println("Exception in generateEncryptedPassword InvalidAlgorithmParameterException :: "+e.getMessage());
        }

        catch (IllegalBlockSizeException e){
            System.err.println("Exception in generateEncryptedPassword IllegalBlockSizeException :: "+e.getMessage());
        }
        catch (BadPaddingException e){
            System.err.println("Exception in generateEncryptedPassword BadPaddingException :: "+e.getMessage());
        }
        return null;


    }


}

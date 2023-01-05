package com.ibsplc.apiserviceleaveforcasting.util;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public class GeneratePlainPassword {

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

    public String decryptPassword(String password)
    {
        try {
            String tempkey = "DB99A2A8EB6904F492E9DF0595ED683C";
            GeneratePlainPassword p = new GeneratePlainPassword();
            byte[] bytekey = p.hexStringToByteArray(tempkey);
            SecretKeySpec sks = new SecretKeySpec(bytekey, GeneratePlainPassword.AES);
            Cipher cipher = Cipher.getInstance(GeneratePlainPassword.AES);
            cipher.init(Cipher.DECRYPT_MODE, sks);
            byte[] decrypted = cipher.doFinal(hexStringToByteArray(password));
            String originalPassword = new String(decrypted);
            System.out.println("****************  Original Password  ****************");
            System.out.println(originalPassword);
            System.out.println("****************  Original Password  ****************");
            return originalPassword;
        }
        catch (NoSuchAlgorithmException e)
        {
            System.err.println("Exception in decryptPassword  NoSuchAlgorithmException ::"+e.getMessage());
        }
        catch (NoSuchPaddingException e)
        {
            System.err.println("Exception in decryptPassword  NoSuchPaddingException ::"+e.getMessage());
        }
        catch (InvalidKeyException e)
        {
            System.err.println("Exception in decryptPassword  InvalidKeyException ::"+e.getMessage());
        }
        catch (IllegalBlockSizeException e)
        {
            System.err.println("Exception in decryptPassword  IllegalBlockSizeException ::"+e.getMessage());
        }
        catch (BadPaddingException e)
        {
            System.err.println("Exception in decryptPassword  BadPaddingException ::"+e.getMessage());
        }
        return null;
    }

}


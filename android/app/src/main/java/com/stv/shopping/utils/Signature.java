
package com.stv.shopping.utils;

import android.text.TextUtils;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeSet;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class Signature {
    public static final String ACCESS_KEY_LEBUY = "letv_lebuy";
    public static final String SECRET_KEY_LEBUY = "bf69c58af0055390f5c3d048e5b98ddb";
    public static final String ACCESS_KEY_WALLET = "oIEGPI0Bt6lJVpMYEoeg";
    public static final String SECRET_KEY_WALLET = "cQYOTXGak7FAnGuuEEXW";
    private static final String KEY_TIME = "_time";
    private static final String KEY_AK = "_ak";
    private static final String PARAMS_SEP = "&";
    private static final String REQUEST_CHARSET = "UTF-8";
    private static final char HEX_DIGITS[] = "0123456789abcdef".toCharArray();

    private static String toHexString(byte[] bytes) {
        StringBuilder sb = new StringBuilder(bytes.length * 2);
        for (byte b : bytes) {
            sb.append(HEX_DIGITS[(b & 0xf0) >>> 4]);
            sb.append(HEX_DIGITS[b & 0x0f]);
        }
        return sb.toString();
    }

    private static String join(Iterable<String> strings, String sep) {
        StringBuilder sb = new StringBuilder();
        boolean first = true;
        for (String item : strings) {
            if (first) {
                first = false;
            } else {
                sb.append(sep);
            }
            sb.append(item);
        }
        return sb.toString();
    }

    /**
     * Get sign string of request params.
     * <p>
     * See
     * <code>http://wiki.letv.cn/pages/viewpage.action?pageId=37325204</code>
     * 
     * @param accessKey Access key of client.
     * @param secretKey Secret key of client.
     * @param params Params of request.
     * @param time Current timestamp.
     * @return Result of sign
     */
    public static String getSignature1(String accessKey, String secretKey, Map<String, String> params, long time) {
        if (isEmpty(accessKey) || isEmpty(secretKey)) {
            throw new IllegalArgumentException("You MUST set access key and secret key for the request!");
        }
        SortedSet<String> set = new TreeSet<String>();
        try {
            set.add(KEY_TIME + "=" + URLEncoder.encode(String.valueOf(time), REQUEST_CHARSET));
            set.add(KEY_AK + "=" + URLEncoder.encode(accessKey, REQUEST_CHARSET));
            if (params != null && params.size() > 0) {
                for (String param : params.keySet()) {
                    String value = params.get(param);
                    if (!TextUtils.isEmpty(value)) {
                        set.add(param + "=" + URLEncoder.encode(value, REQUEST_CHARSET));
                    }
                }
            }
            String paramsString = join(set, PARAMS_SEP);
            String str2Sign = paramsString + secretKey;
            MessageDigest digest = MessageDigest.getInstance("MD5");
            digest.update(str2Sign.getBytes(REQUEST_CHARSET));
            return toHexString(digest.digest());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
    }

    private static boolean isEmpty(CharSequence str) {
        return (str == null || str.toString().trim().length() == 0);
    }

    // http://wiki.letv.cn/pages/viewpage.action?pageId=37323874
    public static String getSignature2(String key, String method, String path, byte[] body, String date, Map<String, String[]> params) {
        try {
            String bodyMD5 = "";
            if (body != null && body.length != 0) {
                MessageDigest digest;
                digest = MessageDigest.getInstance("MD5");
                digest.update(body);
                bodyMD5 = toHexString(digest.digest());
            }
            String paramString = "";
            if (params != null) {
                SortedSet<String> set = new TreeSet<String>();
                for (String param : params.keySet()) {
                    String[] values = params.get(param);
                    for (String value : values) {
                        set.add(param + "=" + value);
                    }
                }
                paramString = join(set, "&");
            }
            String stringToSign = method + "\n" + path + "\n" + bodyMD5 + "\n" + date + "\n" + paramString;
          //  StvLog.i("Sign", stringToSign);
            SecretKeySpec signingKey = new SecretKeySpec(key.getBytes(), "HmacSHA1");
            Mac mac = Mac.getInstance("HmacSHA1");
            mac.init(signingKey);
            byte[] rawHmac = mac.doFinal(stringToSign.getBytes());
            return toHexString(rawHmac);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        }
        return "";
    }
}

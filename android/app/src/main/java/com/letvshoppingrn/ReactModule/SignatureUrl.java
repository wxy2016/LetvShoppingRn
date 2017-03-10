package com.letvshoppingrn.ReactModule;

import android.text.TextUtils;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.stv.shopping.utils.Signature;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;

/**
 * Created by wuxiaoyang on 19/10/16.
 */
public class SignatureUrl extends ReactContextBaseJavaModule{
    public SignatureUrl(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @ReactMethod
    public  void getSignatureUrl(String mParam, String mUrlPath,Boolean isSignature, Callback SignatureUrlCallback){
        HashMap<String, String> mHttpParams = new HashMap<String, String>();
        String [] mParams=mParam.split(" ");
        for(int i=0;i<mParams.length;i++){
            String [] keyvalue=mParams[i].split(":");
            mHttpParams.put(keyvalue[0], keyvalue[1]);
        }
        StringBuilder stringBuilder = new StringBuilder("");
        if (mHttpParams != null) {
            Iterator<String> iterator = mHttpParams.keySet().iterator();
            while (iterator.hasNext()) {
                String key = iterator.next();
                String value = mHttpParams.get(key).toString();
                if (!TextUtils.isEmpty(value)) {
                    if (stringBuilder.length() == 0) {
                        stringBuilder.append("?");
                    } else {
                        stringBuilder.append("&");
                    }
                    stringBuilder.append(key);
                    stringBuilder.append("=");
                    try {
                        stringBuilder.append(URLEncoder.encode(value, "utf-8"));
                    } catch (UnsupportedEncodingException e) {
                        stringBuilder.append(value);
                    }
                }
            }
        }
        String getUrl = mUrlPath + stringBuilder.toString();


        if (isSignature) {
            long currentTimeMillis = System.currentTimeMillis();
            String signatureUrl = Signature.getSignature1(Signature.ACCESS_KEY_LEBUY, Signature.SECRET_KEY_LEBUY, mHttpParams, currentTimeMillis);
            signatureUrl = "_time=" + currentTimeMillis + "&_ak=" + Signature.ACCESS_KEY_LEBUY + "&_sign=" + signatureUrl;

            if (getUrl.contains("?")) {
                getUrl = getUrl + "&" + signatureUrl;
            } else {
                getUrl = getUrl + "?" + signatureUrl;
            }
        }
        SignatureUrlCallback.invoke(getUrl);
    }

    @Override
    public String getName() {
        return "SignatureUrl";
    }
}

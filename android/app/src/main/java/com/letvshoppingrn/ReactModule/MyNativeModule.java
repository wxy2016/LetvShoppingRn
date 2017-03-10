package com.letvshoppingrn.ReactModule;

import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.stv.shopping.MyActivity;

/**
 * Created by chenyuhui on 16-10-13.
 */

public class MyNativeModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;

    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);

        mContext = reactContext;
    }

    @Override
    public String getName() {
        //一定要有这个名字的 在rn代码里面是需要这个名字来调用该类的方法的
        return "MyNativeModule";
    }

    //函数不能有返回值，因为被调用的原生代码是异步的，原生代码执行结束之后只能通过回调函数或者发送消息给rn那边
    //加上注解暴露方法

    @ReactMethod
    public void rnCallNative(String msg) {
       // Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();

        Intent intent = new Intent(mContext, MyActivity.class);

        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);//一定要加上这句 否则报错

        mContext.startActivity(intent);


    }

    public void sendMsgToRn(String msg){
        //将消息msg发送给RN侧
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRNMessage",msg);

    }

}

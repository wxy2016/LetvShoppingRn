package com.letvshoppingrn.ReactPackage;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.letvshoppingrn.ReactModule.MyNativeModule;
import com.letvshoppingrn.ReactModule.SignatureUrl;
import com.letvshoppingrn.ViewManager.LeButtonManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by chenyuhui on 16-10-13.
 */

public class MyReactPackage implements ReactPackage {

    public MyNativeModule myNativeModule;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules=new ArrayList<NativeModule>();
        myNativeModule=new MyNativeModule(reactContext);
        modules.add(myNativeModule);
        modules.add(new SignatureUrl(reactContext));
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new LeButtonManager()
        );
    }
}
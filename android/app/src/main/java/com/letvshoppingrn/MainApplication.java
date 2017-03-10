package com.letvshoppingrn;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.letvshoppingrn.ReactPackage.MyReactPackage;
import io.realm.react.RealmReactPackage;
import java.util.Arrays;
import java.util.List;
import com.letv.rn.focusableView.LeTvPackage;

public class MainApplication extends Application implements ReactApplication {


  private static final MyReactPackage myReactPackage=new MyReactPackage();

  public static MyReactPackage getMyReactPackage() {
    return myReactPackage;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new RealmReactPackage(),
              new LeTvPackage(),
              myReactPackage
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
}

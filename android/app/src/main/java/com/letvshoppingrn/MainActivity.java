package com.letvshoppingrn;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
//        geturl();
        return "LetvShoppingRn";
    }

//    public void geturl(){
//        HashMap<String, String> requestParams = new HashMap<String, String>();
//        requestParams.put("category_id", "10006");
//        requestParams.put("limit", String.valueOf(100));
//        requestParams.put("offset", String.valueOf(0));
//        String url="https://lebuy.scloud.letv.com/api/v3/category/product";
//        SignatureUrl.getSignatureUrl(requestParams,url,true);
//
//    }
}

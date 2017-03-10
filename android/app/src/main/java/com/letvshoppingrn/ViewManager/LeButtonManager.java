package com.letvshoppingrn.ViewManager;

import android.util.TypedValue;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.letvshoppingrn.R;
import com.stv.shopping.widget.LeButton;

/**
 * Created by chenyuhui on 16-10-14.
 */

public class LeButtonManager extends SimpleViewManager<LeButton> {
    private ThemedReactContext mContext;

    @Override
    public String getName() {
        return "LeButton";
    }

    @Override
    protected LeButton createViewInstance(ThemedReactContext reactContext) {
        mContext = reactContext;
        LeButton button = new LeButton(mContext);
        button.setBackgroundResource(R.drawable.btn_default_holo_letv);
        button.setTextSize(TypedValue.COMPLEX_UNIT_PX, mContext.getResources().getDimensionPixelSize(R.dimen.letv_text_size_medium));
        button.setTextColor(mContext.getResources().getColorStateList(R.color.button_color));
        button.setText("点击");
        button.setClickable(true);
        button.setFocusable(true);
        button.requestFocus();
        return button;
    }

    @ReactProp(name = "text")
    public void setText(LeButton view,String text){
        view.requestFocus();
        view.setText(text);
    }
}


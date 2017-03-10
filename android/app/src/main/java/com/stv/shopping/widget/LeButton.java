package com.stv.shopping.widget;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.Button;

import com.stv.shopping.listener.EnlargeViewListener;

/**
 * Created by chenyuhui on 16-10-13.
 */

public class LeButton extends Button {


    public LeButton(Context context) {
        super(context);
        initListener();
    }

    public LeButton(Context context, AttributeSet attrs) {
        super(context, attrs);
        initListener();
    }

    private void initListener() {
        setOnFocusChangeListener(new EnlargeViewListener(this));
    }
}

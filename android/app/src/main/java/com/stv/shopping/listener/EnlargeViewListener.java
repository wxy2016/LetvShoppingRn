package com.stv.shopping.listener;

import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.view.View;

/**
 * Created by chenyuhui on 16-10-13.
 */
public class EnlargeViewListener implements View.OnFocusChangeListener {
    private float mFocusEnlargeScaleX = 1.1f;
    private float mFocusEnlargeScaleY = 1.1f;
    private boolean mFocusEnlarge = true;
    private View mView;
    private OnFocusChangeListener mListener;

    public EnlargeViewListener(View view) {
        mView = view;
    }

    public void setFocusEnlarge(boolean focusEnlarge) {
        mFocusEnlarge = focusEnlarge;
    }

    public boolean getFocusEnlarge() {
        return mFocusEnlarge;
    }

    @Override
    public void onFocusChange(View v, boolean hasFocus) {
        if (mListener != null) {
            mListener.onFocusChange(v, hasFocus);
        }
        if (mFocusEnlarge) {
            if (hasFocus) {
                enLarge();
            } else {
                enNormal();
            }
        }
    }

    public EnlargeViewListener setOnFocusChangeListener(OnFocusChangeListener listener) {
        mListener = listener;
        return this;
    }

    private void enLarge() {
        ObjectAnimator enlargeXl = ObjectAnimator.ofFloat(mView, "scaleX", mFocusEnlargeScaleX);
        ObjectAnimator enlargeYl = ObjectAnimator.ofFloat(mView, "scaleY", mFocusEnlargeScaleY);
        AnimatorSet set = new AnimatorSet();
        set.setDuration(100);
        set.play(enlargeXl).with(enlargeYl);
        set.start();
    }

    private void enNormal() {
        ObjectAnimator enNormalX = ObjectAnimator.ofFloat(mView, "scaleX", 1.0f);
        ObjectAnimator enNormalY = ObjectAnimator.ofFloat(mView, "scaleY", 1.0f);
        AnimatorSet set = new AnimatorSet();
        set.setDuration(0);
        set.play(enNormalX).with(enNormalY);
        set.start();
    }

    public interface OnFocusChangeListener {
        /**
         * Called when the focus state of a view has changed.
         *
         * @param v The view whose state has changed.
         * @param hasFocus The new focus state of v.
         */
        void onFocusChange(View v, boolean hasFocus);
    }
}
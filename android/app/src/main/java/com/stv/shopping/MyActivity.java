package com.stv.shopping;

/**
 * Created by chenyuhui on 16-10-13.
 */
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Toast;

import com.letvshoppingrn.R;
import com.stv.shopping.widget.LeButton;

/**
 * Created by chenyuhui on 16-10-13.
 */

public class MyActivity extends AppCompatActivity {

    private LeButton mClickBtn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my);
        mClickBtn = (LeButton) findViewById(R.id.click_btn);
        mClickBtn.requestFocus();
       // Toast.makeText(this, "myActivity", Toast.LENGTH_SHORT).show();
    }


    public void onBack(View v){

        finish();

    }
}
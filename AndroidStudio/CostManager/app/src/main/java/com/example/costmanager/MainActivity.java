package com.example.costmanager;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.os.Build;
import android.os.Bundle;
import android.os.Debug;
import android.util.Base64;
import android.util.Log;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.InputStream;

public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @SuppressLint("JavascriptInterface")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



        webView = new WebView(this);

        WebSettings webSettings = webView.getSettings();
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.d("MyApplication", consoleMessage.message() + " -- From line " +
                        consoleMessage.lineNumber() + " of " + consoleMessage.sourceId());
                return true;
            }
        });
        webSettings.setDomStorageEnabled(true);
        webSettings.setJavaScriptEnabled(true);

        webView.setWebViewClient(new WebViewClient() {

            @Override
            public void onPageFinished(WebView view, String url) {

                // Inject CSS when page is done loading
                injectCSS();
                super.onPageFinished(view, url);
            }
        });


        webView.loadUrl("file:///android_asset/showitems.html");
        setContentView(webView);
    }

    @Override
    public void onBackPressed() {
        String webUrl = webView.getUrl();
        Log.d("curUrl",webUrl);
        if(webUrl.equals("file:///android_asset/showitems.html")){
            super.onBackPressed();
        }
        else{
            webView.loadUrl("file:///android_asset/showitems.html");
        }
    }


    private void injectCSS() {
        try {
            InputStream inputStream = getAssets().open("styles.css");
            byte[] buffer = new byte[inputStream.available()];
            inputStream.read(buffer);
            inputStream.close();
            String encoded = Base64.encodeToString(buffer, Base64.NO_WRAP);
            webView.loadUrl("javascript:(function() {" +
                    "var parent = document.getElementsByTagName('head').item(0);" +
                    "var styles = document.createElement('styles');" +
                    "styles.type = 'text/css';" +
                    "styles.innerHTML = window.atob('" + encoded + "');" +
                    "parent.appendChild(styles)" +
                    "})()");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
package vn.bookaria.bookaria_mobile

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity : FlutterActivity() {
    companion object {
        private const val CHANNEL_NAME = "vn.bookaria.mobile/platform"
        private const val REQUEST_CAMERA_PERMISSION = 10042
    }

    private var methodChannel: MethodChannel? = null
    private var initialDeepLink: String? = null
    private var pendingCameraResult: MethodChannel.Result? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        initialDeepLink = extractDeepLink(intent)
        super.onCreate(savedInstanceState)
    }

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        val channel = MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL_NAME)
        channel.setMethodCallHandler { call, result ->
            when (call.method) {
                "getInitialLink" -> {
                    val link = initialDeepLink
                    initialDeepLink = null
                    result.success(link)
                }
                "ensureCameraPermission" -> handleEnsureCameraPermission(result)
                else -> result.notImplemented()
            }
        }
        methodChannel = channel
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        val link = extractDeepLink(intent)
        if (link != null) {
            if (methodChannel != null) {
                methodChannel?.invokeMethod("onDeepLink", link)
            } else {
                initialDeepLink = link
            }
        }
    }

    private fun extractDeepLink(intent: Intent?): String? {
        if (intent?.action != Intent.ACTION_VIEW) return null
        val dataString = intent.dataString ?: return null
        return dataString.trim().takeIf { it.isNotEmpty() }
    }

    private fun handleEnsureCameraPermission(result: MethodChannel.Result) {
        if (checkSelfPermission(Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
            result.success(true)
            return
        }
        pendingCameraResult?.success(false)
        pendingCameraResult = result
        requestPermissions(arrayOf(Manifest.permission.CAMERA), REQUEST_CAMERA_PERMISSION)
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray,
    ) {
        if (requestCode == REQUEST_CAMERA_PERMISSION) {
            val granted =
                grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED
            val pending = pendingCameraResult
            pendingCameraResult = null
            pending?.success(granted)
            return
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    }

    override fun onDestroy() {
        methodChannel?.setMethodCallHandler(null)
        methodChannel = null
        pendingCameraResult = null
        super.onDestroy()
    }
}

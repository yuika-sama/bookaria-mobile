import java.net.URI

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

fun resolveWebViewerHost(): String {
    val envFile = listOf(
        rootProject.file("../.env"),
        rootProject.file("../.env.example"),
    ).firstOrNull { it.exists() } ?: return "localhost"

    for (rawLine in envFile.readLines()) {
        val line = rawLine.trim()
        if (line.isEmpty() || line.startsWith("#")) continue
        if (line.startsWith("WEB_VIEWER_ORIGIN=")) {
            val rawUrl = line.substringAfter("=")
                .trim()
                .trim('"', '\'')
            val host = runCatching { URI(rawUrl).host }.getOrNull()
            if (!host.isNullOrBlank()) {
                return host
            }
        }
    }
    return "localhost"
}

android {
    namespace = "vn.bookaria.bookaria_mobile"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "vn.bookaria.bookaria_mobile"
        // Minimum Android 7.0 (API 24) required for ARCore, mobile_scanner and just_audio.
        minSdk = maxOf(flutter.minSdkVersion, 24)
        targetSdk = flutter.targetSdkVersion
        // Uses the version code from pubspec.yaml. When using split APKs, 1000 * ABI_VERSION
        // is added automatically by Flutter. (https://developer.android.com/studio/build/configure-apk-splits#configure-APK-versions)
        // You can force using the value of versionCode by specifying the `-P force-version-code-ignoring-abi=true`
        // flag during build.
        versionCode = flutter.versionCode
        versionName = flutter.versionName
        manifestPlaceholders["webViewerHost"] = resolveWebViewerHost()
    }

    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            // Signing with the debug keys for now, so `flutter run --release` works.
            signingConfig = signingConfigs.getByName("debug")
        }
    }
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

flutter {
    source = "../.."
}

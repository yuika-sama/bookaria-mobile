# Bookaria Mobile (Flutter)

Ứng dụng đọc sách 3D/AR & Tủ sách Offline cho hệ sinh thái Bookaria (`bookaria-backend` & `bookaria-studio`).

## Cấu trúc thư mục chính
- `lib/app/` — App root (`BookariaApp`), điều hướng `GoRouter` (`StatefulShellRoute.indexedStack`), Theme Light/Dark theo token của `bookaria-viewer`.
- `lib/core/contracts/` — Data models (`PublicBook`, `Manifest`, `Scene`, `ViewerEvent`, `BookariaErrorCode`) ánh xạ 1-1 với `bookaria-backend/src/schema/`.
- `lib/core/network/` — `BookariaApiClient` (Dio) kết nối `/api/v1/public/*`.
- `lib/core/storage/` — `AppDatabase` (SQLite `offline_books`, `workflow_progress`, `pending_events`) và `OfflineStoragePaths` (`shared_assets/` chống trùng lặp).
- `lib/core/qr/` — `BookariaLinkParser` parse QR/deep-link (`/b/:slug`, `/preview/:token`, slug trực tiếp).
- `lib/core/audio/` & `lib/core/haptics/` — Phát âm thanh đa kênh (`BGM`, thuyết minh, `SFX`) và phản hồi rung.
- `lib/core/telemetry/` — Hàng đợi thống kê offline-first + báo cáo vi phạm.
- `lib/features/explore/` — Thư viện sách công khai & chi tiết sách + tải offline.
- `lib/features/shelf/` — Tủ sách Offline, khôi phục trang đọc dở, xóa pack & thu gom rác tài nguyên.
- `lib/features/scanner/` — Quét mã QR Bookaria + đèn pin + nhập thủ công.
- `lib/features/reader/` — Unified Reader (`3D | AR | Tabletop`), `WorkflowState`, `QuizPromptSheet`, `MethodChannelArEngineBridge`.
- `lib/features/profile/` — Giao diện Sáng/Tối, Tùy chọn đọc, Chế độ Trẻ em (PIN mặc định `0000`), quản lý dung lượng Offline.

## Chạy thử & Build
App đã fix cứng URL backend mặc định tại `lib/core/config/app_config.dart` (`kDefaultApiBaseUrl = 'http://10.54.220.5:4000/api/v1'`). Chỉ cần chạy trực tiếp:
```bash
flutter run
```

Nếu cần ghi đè tạm thời khi build CI hoặc đổi môi trường mà không sửa code:
```bash
flutter run --dart-define=API_BASE_URL=https://api.bookaria.vn/api/v1
```

## Kết nối thiết bị Android để chạy (`flutter run`)
Android SDK (`platform-tools` / `adb`, `platforms;android-36`, `build-tools;36.0.0`) đã được cài tại `$HOME/Android/Sdk`.

### Cách 1: Điện thoại Android thật (USB hoặc Wi-Fi)
1. Bật **Tùy chọn nhà phát triển** -> **Gỡ lỗi USB (USB debugging)** (hoặc **Gỡ lỗi không dây** trên Android 11+).
2. Cắm cáp USB (chấp nhận hộp thoại *Allow USB debugging*) hoặc ghép đôi Wi-Fi:
   ```bash
   adb pair <IP>:<PORT_PAIR>   # nhập mã 6 số
   adb connect <IP>:<PORT>
   ```
3. Kiểm tra `flutter devices` thấy tên điện thoại rồi chạy:
   ```bash
   flutter run
   ```

### Cách 2: Máy ảo Android Emulator (nếu không cắm điện thoại)
Cài thêm image + emulator rồi tạo AVD:
```bash
sdkmanager --sdk_root="$ANDROID_HOME" "emulator" "system-images;android-36;google_apis;x86_64"
avdmanager create avd -n bookaria_pixel -k "system-images;android-36;google_apis;x86_64" -d "pixel_7"
flutter emulators --launch bookaria_pixel
flutter run
```

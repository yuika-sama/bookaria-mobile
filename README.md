# Bookaria Mobile (Flutter)

Ứng dụng di động đọc sách 3D/AR, quản lý Tủ sách Offline và quét mã QR / Deep link cho hệ sinh thái Bookaria (`bookaria-backend`, `bookaria-viewer`, `bookaria-studio`).

## Tính năng chính

- **Khám phá thư viện công khai (`Explore`)**: Tìm kiếm, sắp xếp (mới nhất / phổ biến), lọc theo độ tuổi, xem chi tiết sách và mở bản Web Viewer.
- **Trình đọc 3D & AR nhúng (`UnifiedReaderScreen`)**: Nhúng trực tiếp bản dựng `bookaria-viewer` trong `WebViewWidget` thông qua `LocalAssetServer` (`http://127.0.0.1:<port>`), hỗ trợ mô hình `.glb` (Draco), chữ 3D, audio/video, tương tác `WorkflowState`, bảng hỏi trắc nghiệm và AR MindAR bằng camera.
- **Tủ sách Offline (`Shelf`)**: Tải trọn gói sách (`manifest.json`, ảnh trang, `.mind`, `.glb`, audio/video) vào SQLite + thư mục `bookaria_storage/shared_assets/` chống trùng lặp tài nguyên; khôi phục trang đang đọc, dọn rác tài nguyên (`GC`) và xếp hàng telemetry chờ đồng bộ khi có mạng.
- **Quét QR & Deep link (`Scanner` & `Router`)**: Nhận liên kết `bookaria://`, `https://<viewer-host>/b/:slug...`, `/preview/:token...`, hỗ trợ đèn pin và nhập slug/token thủ công.
- **Chế độ Trẻ em (`Kid Mode`) & Cá nhân hóa (`Profile`)**: Giới hạn độ tuổi theo cấu hình, yêu cầu mã PIN phụ huynh (mặc định `0000`) khi mở sách vượt tuổi hoặc link Preview chưa kiểm duyệt, ẩn liên kết ngoài trong WebView và đồng bộ theme Sáng/Tối/Hệ thống.

## Cấu trúc thư mục chính

- `assets/viewer/` — Bản dựng tĩnh `bookaria-viewer` (HTML/JS/CSS, Three.js, `DRACOLoader` WASM, `MindAR`, font `.woff`/`.woff2`).
- `lib/app/` — `BookariaApp` (deep link khởi chạy & `onNewIntent`), `GoRouter`, `BookAccessGuard` (Kid Mode & PIN) và `theme.dart`.
- `lib/core/config/` — `EnvConfig` & `AppConfig` nạp URL từ `.env` và hỗ trợ ghi đè bằng `--dart-define`.
- `lib/core/contracts/` — Data models (`PublicBook`, `Manifest`, `Scene`, `ViewerEvent`, `BookariaErrorCode`).
- `lib/core/network/` — `BookariaApiClient` (Dio) kết nối `/api/v1/public/*`.
- `lib/core/platform/` — `BookariaPlatform` (`MethodChannel` xử lý deep link & quyền Camera Android/iOS).
- `lib/core/qr/` — `BookariaLinkParser` phân tích QR/URL/slug/token theo định tuyến `bookaria-viewer`.
- `lib/core/storage/` — `AppDatabase` (SQLite schema v2: `offline_books`, `workflow_progress`, `pending_events`) và `OfflineStoragePaths`.
- `lib/core/telemetry/` — `ReadingEventsService` lưu hàng đợi sự kiện đọc offline-first và gửi báo cáo.
- `lib/features/explore/` — Màn hình Khám phá và Chi tiết sách.
- `lib/features/offline_pack/` — `OfflinePackManager` (tải/xóa/GC gói offline) và `LocalAssetServer` (host viewer, offline API fallback, Range `206`, proxy `/api/v1/*`).
- `lib/features/reader/` — `UnifiedReaderScreen` và cầu nối JavaScript ↔ SQLite/Audio/Haptics/AR.
- `lib/features/scanner/` — Màn hình quét QR & nhập mã thủ công.
- `lib/features/shelf/` — Tủ sách Offline.
- `lib/features/profile/` — Cài đặt giao diện, Kid Mode, PIN và quản lý lưu trữ.

## Cấu hình môi trường (`.env`)

Các URL kết nối được tách riêng ra file `.env` (được liệt kê trong `.gitignore`, kèm file mẫu `.env.example`):

| Biến | Ý nghĩa | Ví dụ |
| --- | --- | --- |
| `API_BASE_URL` | URL gốc API backend (`/api/v1`) | `http://10.0.2.2:4000/api/v1` |
| `WEB_VIEWER_ORIGIN` | Origin của `bookaria-viewer` (dùng cho nút mở Web & deep-link host Android) | `https://viewer.localhost:5174` |
| `KNOWN_VIEWER_HOSTS` | Danh sách host viewer hợp lệ khi parse QR/deep link (phân tách bằng `,`) | `viewer.bookaria.vn,bookaria.vn,viewer.localhost,localhost,127.0.0.1` |

Thứ tự ưu tiên khi chạy: `--dart-define` / `--dart-define-from-file` → `.env` → giá trị fallback mặc định (`localhost`).

### Thiết lập lần đầu

```powershell
# Windows PowerShell
Copy-Item .env.example .env

# macOS / Linux
cp .env.example .env
```

Chỉnh sửa `.env` theo môi trường chạy của bạn trước khi build/run.

## Chạy thử trên Android

Yêu cầu thiết bị Android 7.0+ (`minSdk >= 24` theo `android/app/build.gradle.kts`).

### 1. Chạy bằng Android Emulator

```powershell
flutter emulators --launch <emulator_id>
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:4000/api/v1 --dart-define=WEB_VIEWER_ORIGIN=https://10.0.2.2:5174
```

*(Hoặc điền trực tiếp `10.0.2.2` vào `.env` rồi chạy `flutter run`.)*

### 2. Chạy bằng điện thoại Android thật (khuyên dùng để test Camera AR & 3D Offline)

1. Bật **Tùy chọn nhà phát triển → Gỡ lỗi USB (USB debugging)** trên điện thoại và cắm cáp vào máy tính.
2. Kiểm tra thiết bị nhận qua `flutter devices`.
3. Chọn một trong hai cách nối tới backend local:
   * **Qua cáp USB (`adb reverse`):**
     ```powershell
     adb reverse tcp:4000 tcp:4000
     flutter run --dart-define=API_BASE_URL=http://127.0.0.1:4000/api/v1 --dart-define=WEB_VIEWER_ORIGIN=https://127.0.0.1:5174
     ```
   * **Qua cùng mạng Wi-Fi LAN:** Đặt IP LAN máy tính chạy backend vào `.env` rồi chạy `flutter run`.
4. Debug console/network của WebView 3D bằng Chrome máy tính tại `chrome://inspect/#devices`.

## Kiểm thử & Phân tích tĩnh

```bash
flutter analyze --no-pub
flutter test --no-pub
```

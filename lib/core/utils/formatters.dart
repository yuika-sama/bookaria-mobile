String formatBytes(int bytes) {
  if (bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  var value = bytes.toDouble();
  var unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }
  final decimals = unitIndex == 0 ? 0 : 1;
  return '${value.toStringAsFixed(decimals)} ${units[unitIndex]}';
}

String formatAgeRange(int? min, int? max) {
  if (min != null && max != null) return '$min–$max tuổi';
  if (min != null) return '$min+ tuổi';
  if (max != null) return 'Đến $max tuổi';
  return 'Mọi lứa tuổi';
}

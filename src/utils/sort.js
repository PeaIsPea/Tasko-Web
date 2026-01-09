export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []

  // 1. Tạo một bản đồ vị trí: { 'id1': 0, 'id2': 1, 'id3': 2 }
  const orderMap = {}
  for (let i = 0; i < orderArray.length; i++) {
    orderMap[orderArray[i]] = i
  }

  // 2. Sắp xếp dựa trên bản đồ vị trí đã tạo
  return [...originalArray].sort((a, b) => {
    // Nếu không tìm thấy trong orderMap, ta cho nó xuống cuối mảng (Infinity)
    const posA = orderMap[a[key]] ?? Infinity
    const posB = orderMap[b[key]] ?? Infinity
    return posA - posB
  })
}
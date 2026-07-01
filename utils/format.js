export function money(value) {
  return Number(value || 0).toFixed(2)
}

export function orderStatusText(status) {
  const map = {
    paid: '已付款',
    refunding: '退款处理中',
    refunded: '已退款'
  }
  return map[status] || '待处理'
}

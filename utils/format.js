export function money(value) {
  return Number(value || 0).toFixed(2)
}

function pad(value) {
  return String(value).padStart(2, '0')
}

export function formatDateTime(value) {
  if (!value) return ''

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) {
    return value
  }

  const normalized = typeof value === 'string' ? value.replace(/\//g, '-') : value
  const date = value instanceof Date ? value : new Date(normalized)

  if (Number.isNaN(date.getTime())) {
    return String(value).slice(0, 16)
  }

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join('-') + ` ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function orderStatusText(status) {
  const map = {
    paid: '已付款',
    refunding: '退款处理中',
    refunded: '已退款'
  }
  return map[status] || '待处理'
}

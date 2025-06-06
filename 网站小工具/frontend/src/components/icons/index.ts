import { defineComponent, h } from 'vue'

export const CompressIcon = defineComponent({
  name: 'CompressIcon',
  render() {
    return h('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: '#1890ff',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' }),
      h('path', { d: 'M3.3 7l8.7 5 8.7-5' }),
      h('path', { d: 'M12 22V12' })
    ])
  }
})

export const ConvertIcon = defineComponent({
  name: 'ConvertIcon',
  render() {
    return h('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: '#1890ff',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M17 3v6h-6' }),
      h('path', { d: 'M3 14a9 9 0 0 0 9 9 9 9 0 0 0 6-2.3l-3-3a5 5 0 0 1-3 1 5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 3 1l3-3A9 9 0 0 0 12 5a9 9 0 0 0-9 9z' })
    ])
  }
})

export const CropIcon = defineComponent({
  name: 'CropIcon',
  render() {
    return h('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: '#1890ff',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M6 2v14a2 2 0 0 0 2 2h14' }),
      h('path', { d: 'M18 22V8a2 2 0 0 0-2-2H2' })
    ])
  }
}) 
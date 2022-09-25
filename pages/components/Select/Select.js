// pages/components/Select/Select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchFunc:Function
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectList:[],
    inputValue:'',
  },

  lifetimes:{
    attached:async function(){
      // 请求初始数据
      this.triggerEvent('')
      console.log('请求初始数据')
      let res = await searchFunc()
      this.setData({
          selectList:res,
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

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
      // this.triggerEvent('searchFunc', {like:this.data.inputValue,callback:(res) => {
      //   this.setData({
      //     selectList:res
      //   })
      // }})
      this.getData(
        this.data.inputValue,
        (res) => {
          this.setData({
            selectList:res
          })}
      )
    }
  },
  observers:{
    'inputValue':function(inputValue){
      this.getData(
        inputValue,
        (res) => {
          this.setData({
            selectList:res
          })}
      )
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    inputFunc(e){
      let input = e.detail.value
      console.log('input输入',input)
      this.setData({
        inputValue:input
      })
    },
    getData(like,callback){
      this.triggerEvent('searchFunc', {like:like,callback:callback})
    },
  }
})

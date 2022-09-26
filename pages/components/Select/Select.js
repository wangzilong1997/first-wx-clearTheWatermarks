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
    inputId:'-1',
    selectShow:false,
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
    },
    'selectList':function(selectList){
      console.log('selectList展示列表',selectList)
      let target = selectList.filter(item => {
        return item.Name == this.data.inputValue
      })
      if(target.length == 0){
        this.setData({
          inputId:-1
        })
      }else{
        this.setData({
          inputId:target[0].ID
        })
      }
    },
    'inputValue,inputId':function(inputValue,inputId){
      this.backData(
        this.data.inputId,
        this.data.inputValue
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
    backData(id,name){
      this.triggerEvent('getSelectFunc', {id:id,name:name})
    },
    focusFunc(){
      this.setData({
        selectShow:true
      })
    },
    blurFunc(){
      this.setData({
        selectShow:false
      })
    },
    selectListTap(e){
      let {id,name} = e.currentTarget.dataset
      console.log('点击选择项',id,name)
      this.setData({
        inputValue:name,
        inputId:id
      })
    }
  }
})

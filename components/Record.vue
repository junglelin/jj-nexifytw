<template lang="pug">
	main#app.container
		.tools-wrap
			div
				a.create(href="javascript:;" @click="createStatus = !createStatus") 新紀錄
			div
				a.save(href="javascript:;" @click="saveForm") 保存
			div
				a.update(href="javascript:;" @click="GetMmberRecord") 更新
		.data-wrap
			.row
				.col 名字
				.col 出生日期
				.col 工資
				.col 住址
			.row(v-for="item in memberRecord")
				.col
					input(type="text", v-model="item.Name")
				.col
					input(type="date", :v-model="format_date(item.DateOfBirth)" :value="format_date(item.DateOfBirth)")
				.col
					input(type="range", min="0", max="999999", v-model="item.Salary")
				.col
					textarea(v-model="item.Address")
			.row(:class="{hide: !createStatus}")
				.col
					input(type="text", v-model="cloneData.Name")
				.col
					input(type="date", v-model="cloneData.DateOfBirth")
				.col
					input(type="range", min="0", max="999999" v-model="cloneData.Salary")
				.col
					textarea(v-model="cloneData.Address")
</template>
<script>
import moment from 'moment'
import { apiHelper } from '~/service/apis'

export default {
  name: 'Record',
  data () {
    return {
      createStatus: false,
      memberRecord: {},
	  cloneData: {
		  Name: '',
		  DateOfBirth: '',
		  Salary: '',
		  Address: ''
	  }
    }
  },
  created () {
    // this.GetMmberRecord()
  },
  methods: {
    format_date (value) {
      if (value) {
	  	return moment(String(value)).format('YYYY-MM-DD')
	  }
    },
    GetMmberRecord () {
      const obj = {}
      apiHelper.get('/GetRecords', obj)
        .then((res) => {
          this.memberRecord = res.data.Data
          	this.createStatus = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    saveForm () {
      if (this.memberRecord.length === undefined) {
        return alert('Oops !!!')
      }
      const obj = (this.createStatus) ? this.memberRecord.concat(this.cloneData) : this.memberRecord
      apiHelper.post('/SaveRecords', obj)
        .then((res) => {
          this.GetMmberRecord()
          	this.createStatus = false
          	this.cloneData = {}
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

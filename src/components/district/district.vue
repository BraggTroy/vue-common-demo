<template>
  <div>
    <Select :size="size" class="dis-select" @on-change="provinceChange" v-model="province" style="width:100px">
      <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.value }}</Option>
    </Select>
    <Select :size="size" class="dis-select" @on-change="cityChange" v-model="city" style="width:100px">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
    </Select>
    <Select :size="size" class="dis-select" @on-change="countyChange" v-model="county" style="width:100px">
      <Option v-for="item in countyList" :value="item.value" :key="item.value">{{ item.value }}</Option>
    </Select>
  </div>
</template>

<script>
import address from './districts'
export default {
  name: '',
  model: {
    prop: 'value',
    event: 'up'
  },
  props: {
    value: null,
    format: {
      type: String,
      default: '-'
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      province: '',
      city: '',
      county: '',
      addressList: [],
      provinceList: [],
      cityList: [],
      countyList: []
    }
  },
  watch: {
    value () {
      this.initFirstData()
    }
  },
  mounted () {
    this.addressList = address.map(item => JSON.parse(JSON.stringify(item)))
    this.initFirstData()
  },
  methods: {
    initFirstData () {
      this.provinceList = this.addressList
      this.cityList = this.provinceList[0].children
      this.countyList = this.cityList[0].children
      if (this.value) {
        let modelAddress = this.value.split(this.format)
        this.province = modelAddress[0]
        this.city = modelAddress[1]
        this.county = modelAddress[2]
        this.setInitData()
      } else {
        this.province = this.provinceList[0].value
        this.city = this.cityList[0].value
        this.county = this.countyList[0].value
      }
    },
    provinceChange () {
      this.cityList = this.findChildren('province')
      this.countyList = this.cityList[0].children
      this.city = this.cityList[0].value
      this.county = this.countyList[0].value
      this.modelData()
    },
    cityChange () {
      this.countyList = this.findChildren('city')
      this.county = this.countyList[0].value
      this.modelData()
    },
    countyChange () {
      this.modelData()
    },
    findChildren (type) {
      let res = []
      if (type === 'province') {
        for (let i = 0; i < this.addressList.length; i++) {
          if (this.province === this.addressList[i].value) {
            res = this.addressList[i].children
            break
          }
        }
      }
      if (type === 'city') {
        for (let i = 0; i < this.cityList.length; i++) {
          if (this.city === this.cityList[i].value) {
            res = this.cityList[i].children
            break
          }
        }
      }
      return res
    },
    modelData () {
      let val = `${this.province}${this.format}${this.city}${this.format}${this.county}`
      this.$emit('up', val)
    },
    setInitData () {
      this.cityList = this.findChildren('province')
      this.countyList = this.findChildren('city')
    }
  }
}
</script>

<style scoped>
.dis-select{margin-right: 10px;}
</style>

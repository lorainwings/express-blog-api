import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import baseModel from './base-model'

const articleSchema = new mongoose.Schema({
  ...baseModel,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tagList: {
    type: [String],
    default: null
  },
  favoritesCount: {
    type: Number,
    default: 0
  },
  author: {
    type: Schema.Types.ObjectId,
    // 加上ref后可以使用populate来映射到User模型
    ref: 'User',
    required: true
  }
})

export default articleSchema

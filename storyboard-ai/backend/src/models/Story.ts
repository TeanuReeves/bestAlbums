import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  HasMany,
  AllowNull,
  Index,
} from 'sequelize-typescript'
import { v4 as uuidv4 } from 'uuid'
import { Storyboard } from './Storyboard'

export interface StoryAttributes {
  id: string
  title: string
  content: string
  summary?: string
  genre?: string
  wordCount: number
  metadata?: Record<string, any>
  status: 'draft' | 'published' | 'archived'
  userId?: string
  createdAt: Date
  updatedAt: Date
}

export interface StoryCreationAttributes extends Omit<StoryAttributes, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string
}

@Table({
  tableName: 'stories',
  timestamps: true,
  indexes: [
    {
      name: 'idx_stories_user_id',
      fields: ['userId'],
    },
    {
      name: 'idx_stories_status',
      fields: ['status'],
    },
    {
      name: 'idx_stories_created_at',
      fields: ['createdAt'],
    },
    {
      name: 'idx_stories_title',
      fields: ['title'],
      type: 'gin',
      operator: 'gin_trgm_ops',
    },
  ],
})
export class Story extends Model<StoryAttributes, StoryCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
    validate: {
      notEmpty: true,
      len: [1, 255],
    },
  })
  title!: string

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
    validate: {
      notEmpty: true,
    },
  })
  content!: string

  @Column({
    type: DataType.TEXT,
  })
  summary?: string

  @Column({
    type: DataType.STRING(100),
  })
  genre?: string

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  })
  wordCount!: number

  @Column({
    type: DataType.JSONB,
    defaultValue: {},
  })
  metadata?: Record<string, any>

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('draft', 'published', 'archived'),
    defaultValue: 'draft',
  })
  status!: 'draft' | 'published' | 'archived'

  @Column({
    type: DataType.UUID,
  })
  userId?: string

  @CreatedAt
  createdAt!: Date

  @UpdatedAt
  updatedAt!: Date

  // Associations
  @HasMany(() => Storyboard)
  storyboards!: Storyboard[]

  // Hooks
  beforeCreate(instance: Story) {
    if (!instance.id) {
      instance.id = uuidv4()
    }
    // Calculate word count if not provided
    if (!instance.wordCount) {
      instance.wordCount = instance.content.split(/\s+/).filter(word => word.length > 0).length
    }
  }

  beforeUpdate(instance: Story) {
    // Recalculate word count if content changed
    if (instance.changed('content')) {
      instance.wordCount = instance.content.split(/\s+/).filter(word => word.length > 0).length
    }
  }
}
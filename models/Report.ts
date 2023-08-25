import mongoose from 'mongoose'
import { IReport } from '../interfaces/global'
const reportSchema = new mongoose.Schema<IReport>({
  id: mongoose.Types.ObjectId,
  timeCreated: { type: String, default: new Date(Date.now()).toString() },
  entityReported: {
    type: Object,
    entityType: String,
    entityId: mongoose.Types.ObjectId,
    required: true
  },
  title: String,
  reasons: { type: [String], required: true },
  reportBody: { type: String, default: '', required: false }
})
const Report = mongoose.model<IReport>('reports', reportSchema)
export { Report, reportSchema }

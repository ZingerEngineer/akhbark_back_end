import mongoose from 'mongoose'
import { IReport } from '../../interfaces/global'
const reportSchema = new mongoose.Schema<IReport>({
  id: mongoose.Types.ObjectId,
  timeCreated: String,
  entityReported: {
    entityId: mongoose.Types.ObjectId
  },
  title: String,
  reasons: [String],
  reportBody: String
})
const Report = mongoose.model<IReport>('reports', reportSchema)
export { Report, reportSchema }

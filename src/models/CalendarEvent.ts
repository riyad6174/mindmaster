import mongoose, { Schema, model, models } from 'mongoose';

export type EventCategory = 'academic' | 'holiday' | 'exam' | 'event' | 'break';

export interface ICalendarEvent {
  _id: mongoose.Types.ObjectId;
  title: string;
  start: Date;
  end: Date;
  category: EventCategory;
  allDay: boolean;
  desc?: string;
  createdAt: Date;
}

const CalendarEventSchema = new Schema<ICalendarEvent>(
  {
    title:    { type: String, required: true, trim: true },
    start:    { type: Date, required: true },
    end:      { type: Date, required: true },
    category: { type: String, enum: ['academic', 'holiday', 'exam', 'event', 'break'], required: true },
    allDay:   { type: Boolean, default: true },
    desc:     { type: String, trim: true },
  },
  { timestamps: true }
);

export const CalendarEvent = models.CalendarEvent || model<ICalendarEvent>('CalendarEvent', CalendarEventSchema);

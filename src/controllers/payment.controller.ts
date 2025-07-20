import { repository } from '@loopback/repository';
import { PaymentRepository } from '../repositories';
import { Payment } from '../models';
import {
  get,
  post,
  patch,
  del,
  param,
  requestBody,
  HttpErrors,
} from '@loopback/rest';

export class PaymentController {
  constructor(
    @repository(PaymentRepository)
    public paymentRepository: PaymentRepository,
  ) {}

  @get('/get/payments')
  async findPayments(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  @post('/add/payments')
  async createPayment(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              amount: { type: 'number' },
              status: { type: 'string', enum: ['paid', 'overdue'] },
              date: { type: 'string', format: 'date' },
              duedate: { type: 'string', format: 'date' },
              paymentMethod: { type: 'string' },
              notes: { type: 'string' },
              notesHistory: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    date: { type: 'string', format: 'date' },
                    note: { type: 'string' },
                  },
                },
              },
            },
            required: [
              'name',
              'amount',
              'status',
              'date',
              'duedate',
              'paymentMethod',
              'notes',
            ],
          },
        },
      },
    })
    payment: Omit<Payment, 'id'>,
  ): Promise<Payment> {
    // Validate input
    if (isNaN(payment.amount) || payment.amount < 0) {
      throw new HttpErrors.BadRequest('Invalid amount');
    }
    if (!['paid', 'overdue'].includes(payment.status)) {
      throw new HttpErrors.BadRequest('Invalid status');
    }
    if (isNaN(Date.parse(payment.date)) || isNaN(Date.parse(payment.duedate))) {
      throw new HttpErrors.BadRequest('Invalid date format');
    }

    return this.paymentRepository.create(payment);
  }

  @patch('/payments/{id}')
  async updatePayment(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              amount: { type: 'number' },
              status: { type: 'string', enum: ['paid', 'overdue'] },
              date: { type: 'string', format: 'date' },
              duedate: { type: 'string', format: 'date' },
              paymentMethod: { type: 'string' },
              notes: { type: 'string' },
              notesHistory: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    date: { type: 'string', format: 'date' },
                    note: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    })
    payment: Partial<Payment>,
  ): Promise<void> {
    // Validate input
    if (payment.amount && (isNaN(payment.amount) || payment.amount < 0)) {
      throw new HttpErrors.BadRequest('Invalid amount');
    }
    if (payment.status && !['paid', 'overdue'].includes(payment.status)) {
      throw new HttpErrors.BadRequest('Invalid status');
    }
    if (payment.date && isNaN(Date.parse(payment.date))) {
      throw new HttpErrors.BadRequest('Invalid date format');
    }
    if (payment.duedate && isNaN(Date.parse(payment.duedate))) {
      throw new HttpErrors.BadRequest('Invalid duedate format');
    }

    await this.paymentRepository.updateById(id, payment);
  }

  @del('/payments/{id}')
  async deletePayment(@param.path.string('id') id: string): Promise<void> {
    await this.paymentRepository.deleteById(id);
  }
}

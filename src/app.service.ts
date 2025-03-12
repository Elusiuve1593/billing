import { Inject, Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './order-created.event';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequest } from './get-user-req.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated({ userId, price }: OrderCreatedEvent) {
    this.authClient
      .send('get_user', new GetUserRequest(userId))
      .subscribe((user) =>
        console.log(
          `Billing user with stripe ID ${user.stripeUserId} a price of $${price}`,
        ),
      );
  }
}

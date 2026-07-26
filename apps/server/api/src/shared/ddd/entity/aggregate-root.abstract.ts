import { Entity } from './entity.abstract';

export interface DomainEvent {
  readonly occurredAt: Date;
}

export abstract class AggregateRoot<Id> extends Entity<Id> {
  private readonly domainEvents: DomainEvent[] = [];

  protected constructor(id: Id) {
    super(id);
  }

  protected addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  pullDomainEvents(): readonly DomainEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents.length = 0;

    return events;
  }

  getDomainEvents(): readonly DomainEvent[] {
    return [...this.domainEvents];
  }
}

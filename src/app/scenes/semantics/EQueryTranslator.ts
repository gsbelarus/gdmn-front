import { EntityLink, EntityQuery, EntityQueryField, EntityQueryOptions, isEntityAttribute } from 'gdmn-orm';
import { Determiner, ICommand, ICommandObject } from 'gdmn-nlp-agent';

export class EQueryTranslator {
  public static process(command: ICommand): EntityQuery[] {
    if (command.objects) {
      switch (command.action) {
        case 'SHOW':
          return command.objects.map(commandObject => {
            const fields = Object.values(commandObject.entity.attributes).reduce(
              (eFields, attribute) => {
                if (!isEntityAttribute(attribute)) {
                  eFields.push(new EntityQueryField(attribute));
                }
                return eFields;
              },
              <EntityQueryField[]>[]
            );
            const link = new EntityLink(commandObject.entity, 'alias', fields);
            const options = EQueryTranslator.createOptions(commandObject);
            return new EntityQuery(link, options);
          });
      }
    }
    throw new Error("Can't create EntityQuery by command");
  }

  private static createOptions(commandObject: ICommandObject): EntityQueryOptions | undefined {
    switch (commandObject.determiner) {
      case Determiner.All:
        return;
    }
  }
}

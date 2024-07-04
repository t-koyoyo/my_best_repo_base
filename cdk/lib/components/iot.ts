import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Iot関連リソースのコンストラクタ
 * @resources Iot Core
 * @props env 環境名
 */
export class Iot extends Construct {
  constructor(scope: Construct, id: string, props: { env: string }) {
    super(scope, id);

    // ------------------------------------
    // Iot Core - Thing Group
    //  ├── Location
    //  │   ├── SandBox
    //  ├── Type
    //  │   ├── RasberryPi
    //  ├── Updater
    //  │   ├── Patch
    // ------------------------------------
    new cdk.aws_iot.CfnThingGroup(this, 'IotThingGroupLocation', {
      thingGroupName: `tibit-${props.env}_Location`,
      thingGroupProperties: {
        attributePayload: {
          attributes: {
            project: 'tibit',
            env: props.env,
          },
        },
      },
    });
    new cdk.aws_iot.CfnThingGroup(this, 'IotThingGroupSandBox', {
      parentGroupName: `tibit-${props.env}_Location`,
      thingGroupName: `tibit-${props.env}_SandBox`,
      thingGroupProperties: {
        attributePayload: {
          attributes: {
            project: 'tibit',
            env: props.env,
          },
        },
      },
    });
    new cdk.aws_iot.CfnThingGroup(this, 'IotThingGroupType', {
      thingGroupName: `tibit-${props.env}_Type`,
      thingGroupProperties: {
        attributePayload: {
          attributes: {
            project: 'tibit',
            env: props.env,
          },
        },
      },
    });
    new cdk.aws_iot.CfnThingGroup(this, 'IotThingGroupRasberryPi', {
      parentGroupName: `tibit-${props.env}_Type`,
      thingGroupName: `tibit-${props.env}_RasberryPi`,
      thingGroupProperties: {
        attributePayload: {
          attributes: {
            project: 'tibit',
            env: props.env,
          },
        },
      },
    });
    new cdk.aws_iot.CfnThingGroup(this, 'IotThingGroupUpdater', {
      thingGroupName: `tibit-${props.env}_Updater`,
      thingGroupProperties: {
        attributePayload: {
          attributes: {
            project: 'tibit',
            env: props.env,
          },
        },
      },
    });
    new cdk.aws_iot.CfnThingGroup(this, 'IotThingGroupPatch', {
      parentGroupName: `tibit-${props.env}_Updater`,
      thingGroupName: `tibit-${props.env}_Patch`,
      thingGroupProperties: {
        attributePayload: {
          attributes: {
            project: 'tibit',
            env: props.env,
          },
        },
      },
    });

    // ------------------------------------
    // Iot Core - Thing Type
    // ------------------------------------
    new cdk.aws_iot.CfnThingType(this, 'IotThingType', {
      thingTypeName: `tibit-${props.env}_RasberryPi`,
      thingTypeProperties: {
        searchableAttributes: ['model', 'macAddress'],
      },
    });

    // ------------------------------------
    // Iot Core - Policy
    // ------------------------------------
  }
}
import { Icon } from "@chakra-ui/react";
import {
  Box,
  Cloud,
  Container,
  Database,
  Globe,
  HardDrive,
  KeyRound,
  MessageSquare,
  Server,
  ShieldCheck,
  User,
  Webhook,
  Zap,
  type LucideIcon,
} from "lucide-react";

const MAP: [RegExp, LucideIcon][] = [
  [/usuario|user|navegador|browser|cliente|client/i, User],
  [/api gateway|appsync|gateway/i, Webhook],
  [/lambda/i, Zap],
  [/cloudfront|route ?53|cdn|amplify/i, Globe],
  [/s3|efs|ebs|storage/i, HardDrive],
  [
    /rds|aurora|dynamodb|documentdb|elasticache|database|postgres|mysql/i,
    Database,
  ],
  [/vpc|security group|waf|shield|iam|secrets|kms|acm/i, ShieldCheck],
  [/cognito|auth/i, KeyRound],
  [/sqs|sns|eventbridge|kinesis|ses/i, MessageSquare],
  [/ecs|fargate|eks|app runner|docker/i, Container],
  [/ec2|lightsail|server/i, Server],
];

export function iconFor(name: string): LucideIcon {
  return (
    MAP.find(([re]) => re.test(name))?.[1] ??
    (/aws|amazon/i.test(name) ? Cloud : Box)
  );
}

export default function ServiceIcon({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  const Ico = iconFor(name);
  return (
    <Icon color="brand.fg">
      <Ico size={size} />
    </Icon>
  );
}

import { Options } from '@components/options/options';
import { Tools } from './tools';

export class ToolsState {
  tool: Tools;
  options: Options[];
  title: string;

  content: string = '';
}
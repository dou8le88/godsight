/**
 * Tracks the current extension instance.
 * One instance is created for every time the extension
 * panel is opened in separate devtools windows.
 */
export class InstanceManager {
  static godsightInstanceKey = 'godsightInstanceId';
  static instanceId = crypto.randomUUID();
}

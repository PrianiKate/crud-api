import cluster from 'cluster';
import { WorkerUserCollectionEventType } from './WorkerUserCollectionEventType';
import { UserModel } from './UserModel';

export class WorkerUserCollection {
  async findAll() {
    return await this.sendMessageToMaster(
      WorkerUserCollectionEventType.findAll,
      []
    );
  }

  async findOne(id: string) {
    return await this.sendMessageToMaster(
      WorkerUserCollectionEventType.findOne,
      [id]
    );
  }

  async create(userData: Omit<UserModel, 'id'>) {
    return await this.sendMessageToMaster(
      WorkerUserCollectionEventType.create,
      [userData]
    );
  }

  async updateOne(id: string, userData: Omit<UserModel, 'id'>) {
    return await this.sendMessageToMaster(
      WorkerUserCollectionEventType.updateOne,
      [id, userData]
    );
  }

  async deleteOne(id: string) {
    return await this.sendMessageToMaster(
      WorkerUserCollectionEventType.updateOne,
      [id]
    );
  }

  private async sendMessageToMaster(
    type: WorkerUserCollectionEventType,
    params: unknown
  ) {
    return new Promise((resolve, reject) => {
      process.send?.({ type, params });

      cluster.worker?.on('message', (data) => {
        if (data.type === type) {
          resolve(data.result);
        } else {
          reject(data);
        }
      });
    });
  }
}

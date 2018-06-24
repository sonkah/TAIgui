import { NewTaskModule } from './new-task.module';

describe('NewTaskModule', () => {
  let newTaskModule: NewTaskModule;

  beforeEach(() => {
    newTaskModule = new NewTaskModule();
  });

  it('should create an instance', () => {
    expect(newTaskModule).toBeTruthy();
  });
});

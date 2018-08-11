import { EditTaskModule } from './edit-task.module';

describe('EditTaskModule', () => {
  let editTaskModule: EditTaskModule;

  beforeEach(() => {
    editTaskModule = new EditTaskModule();
  });

  it('should create an instance', () => {
    expect(editTaskModule).toBeTruthy();
  });
});

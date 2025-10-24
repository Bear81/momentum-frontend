import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HabitList from '../components/HabitList';

test('renders list header and handles add button', async () => {
  render(<HabitList />);
  expect(screen.getByRole('heading', { name: /habits/i })).toBeInTheDocument();

  // If you have an “Add Habit” button:
  const addBtn = screen.getByRole('button', { name: /add habit/i });
  await userEvent.click(addBtn);
  // assert modal/field appears, etc. (adjust to your UI)
});

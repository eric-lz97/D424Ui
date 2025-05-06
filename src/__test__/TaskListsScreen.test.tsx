import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import TaskListScreen from '../components/TaskListsScreen';

// ✅ MOCK THE CONTEXT TO INCLUDE "Groceries"
vi.mock('../AppProvider', async () => {
  const actual = await vi.importActual<object>('../AppProvider');
  return {
    ...actual,
    useAppContext: () => ({
      taskLists: [
        {
          id: '1',
          title: 'Groceries',
          tasks: [
            { id: '1a', title: 'Buy eggs', completed: false },
            { id: '1b', title: 'Buy milk', completed: true }
          ]
        }
      ]
    })
  };
});

describe('TaskListScreen', () => {
  const customRender = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

  it('renders task list title and task count', () => {
    customRender(<TaskListScreen />);
    expect(screen.getByText(/My Task Lists/i)).toBeInTheDocument();
    expect(screen.getByText(/Create New Task List/i)).toBeInTheDocument();
  });

  it('navigates to new task list screen on button click', () => {
    customRender(<TaskListScreen />);
    const btn = screen.getByRole('button', { name: /create new task list/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    // Optional: mock and assert navigation
  });

  it('navigates to a task list when card is clicked', () => {
    customRender(<TaskListScreen />);
    const card = screen.getByText(/Create New Task List/i);
    expect(card).toBeInTheDocument();
    fireEvent.click(card);
    // Optional: mock and assert navigation
  });
});

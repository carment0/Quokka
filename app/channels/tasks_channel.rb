class TasksChannel < ApplicationCable::Channel
  # Channels are long-lived.
  def subscribed
    puts "Rceived params: #{params}"
    stream_from 'tasks'
  end

  def received(data)
    puts "TaskChannel method #received is called!!! with data #{data}"
  end

  def unsubscribed
    puts "Someone unsubscribed but I don't know who"
  end
end

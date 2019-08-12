class GroupsController < ApplicationController

  def new

  end

  def create

  end

  def edit
    @group = Group.find(pramas[:id])
  end

  def update

  end

end
